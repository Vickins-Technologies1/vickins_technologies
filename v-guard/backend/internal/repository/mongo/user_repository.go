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

type UserRepository struct {
	col *mongo.Collection
}

func NewUserRepository(db *mongo.Database) *UserRepository {
	return &UserRepository{col: db.Collection("users")}
}

func (r *UserRepository) Create(ctx context.Context, user *domain.User) error {
	res, err := r.col.InsertOne(ctx, user)
	if err != nil {
		return err
	}
	if oid, ok := res.InsertedID.(primitive.ObjectID); ok {
		user.ID = oid
	}
	return nil
}

func (r *UserRepository) FindByEmail(ctx context.Context, email string) (*domain.User, error) {
	var user domain.User
	err := r.col.FindOne(ctx, bson.M{"email": email}).Decode(&user)
	if err != nil {
		return nil, mapMongoErr(err)
	}
	return &user, nil
}

func (r *UserRepository) FindByID(ctx context.Context, id primitive.ObjectID) (*domain.User, error) {
	var user domain.User
	err := r.col.FindOne(ctx, bson.M{"_id": id}).Decode(&user)
	if err != nil {
		return nil, mapMongoErr(err)
	}
	return &user, nil
}

func (r *UserRepository) Update(ctx context.Context, user *domain.User) error {
	user.UpdatedAt = time.Now().UTC()
	_, err := r.col.UpdateByID(ctx, user.ID, bson.M{"$set": user})
	return err
}

func (r *UserRepository) DeductCredits(ctx context.Context, id primitive.ObjectID, credits float64) error {
	_, err := r.col.UpdateOne(ctx, bson.M{"_id": id, "credits": bson.M{"$gte": credits}}, bson.M{"$inc": bson.M{"credits": -credits}})
	return err
}

func (r *UserRepository) AddCredits(ctx context.Context, id primitive.ObjectID, credits float64) error {
	_, err := r.col.UpdateOne(ctx, bson.M{"_id": id}, bson.M{"$inc": bson.M{"credits": credits}})
	return err
}

func (r *UserRepository) ListActive(ctx context.Context) ([]domain.User, error) {
	cur, err := r.col.Find(ctx, bson.M{"active": true}, options.Find().SetSort(bson.D{{Key: "createdAt", Value: -1}}))
	if err != nil {
		return nil, err
	}
	defer cur.Close(ctx)

	var out []domain.User
	if err := cur.All(ctx, &out); err != nil {
		return nil, err
	}
	return out, nil
}

func mapMongoErr(err error) error {
	if err == mongo.ErrNoDocuments {
		return domain.ErrNotFound
	}
	return err
}
