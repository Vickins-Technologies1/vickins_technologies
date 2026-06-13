package mongorepo

import (
	"context"

	"github.com/vickins-technologies/v-guard/backend/internal/domain"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type UsageRepository struct {
	col *mongo.Collection
}

func NewUsageRepository(db *mongo.Database) *UsageRepository {
	return &UsageRepository{col: db.Collection("usage_snapshots")}
}

func (r *UsageRepository) CreateSnapshot(ctx context.Context, snap *domain.UsageSnapshot) error {
	_, err := r.col.InsertOne(ctx, snap)
	return err
}

func (r *UsageRepository) FindLatestSnapshot(ctx context.Context, userID primitive.ObjectID, source string) (*domain.UsageSnapshot, error) {
	var snap domain.UsageSnapshot
	err := r.col.FindOne(
		ctx,
		bson.M{"userId": userID, "source": source},
		options.FindOne().SetSort(bson.D{{Key: "recordedAt", Value: -1}}),
	).Decode(&snap)
	if err != nil {
		return nil, mapMongoErr(err)
	}
	return &snap, nil
}

func (r *UsageRepository) ListRecentByUser(ctx context.Context, userID primitive.ObjectID, limit int) ([]domain.UsageSnapshot, error) {
	cur, err := r.col.Find(
		ctx,
		bson.M{"userId": userID},
		options.Find().SetSort(bson.D{{Key: "recordedAt", Value: -1}}).SetLimit(int64(limit)),
	)
	if err != nil {
		return nil, err
	}
	defer cur.Close(ctx)

	var out []domain.UsageSnapshot
	if err := cur.All(ctx, &out); err != nil {
		return nil, err
	}
	return out, nil
}
