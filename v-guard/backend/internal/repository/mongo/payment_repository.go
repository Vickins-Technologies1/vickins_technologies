package mongorepo

import (
	"context"
	"time"

	"github.com/vickins-technologies/v-guard/backend/internal/domain"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type PaymentRepository struct {
	col *mongo.Collection
}

func NewPaymentRepository(db *mongo.Database) *PaymentRepository {
	return &PaymentRepository{col: db.Collection("payments")}
}

func (r *PaymentRepository) CreateIntent(ctx context.Context, intent *domain.PaymentIntent) error {
	_, err := r.col.InsertOne(ctx, intent)
	return err
}

func (r *PaymentRepository) FindByReference(ctx context.Context, reference string) (*domain.PaymentIntent, error) {
	var intent domain.PaymentIntent
	err := r.col.FindOne(ctx, bson.M{"reference": reference}).Decode(&intent)
	if err != nil {
		return nil, mapMongoErr(err)
	}
	return &intent, nil
}

func (r *PaymentRepository) MarkPaid(ctx context.Context, reference string, paidAt time.Time) error {
	_, err := r.col.UpdateOne(ctx, bson.M{"reference": reference}, bson.M{"$set": bson.M{"status": "paid", "paidAt": paidAt}})
	return err
}

func (r *PaymentRepository) ListRecentByUser(ctx context.Context, userID primitive.ObjectID, limit int) ([]domain.PaymentIntent, error) {
	cur, err := r.col.Find(
		ctx,
		bson.M{"userId": userID},
		options.Find().SetSort(bson.D{{Key: "createdAt", Value: -1}}).SetLimit(int64(limit)),
	)
	if err != nil {
		return nil, err
	}
	defer cur.Close(ctx)

	var out []domain.PaymentIntent
	if err := cur.All(ctx, &out); err != nil {
		return nil, err
	}
	return out, nil
}
