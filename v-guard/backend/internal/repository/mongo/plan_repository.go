package mongorepo

import (
	"context"

	"github.com/vickins-technologies/v-guard/backend/internal/domain"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type PlanRepository struct {
	col *mongo.Collection
}

func NewPlanRepository(db *mongo.Database) *PlanRepository {
	return &PlanRepository{col: db.Collection("proxy_plans")}
}

func (r *PlanRepository) Create(ctx context.Context, plan *domain.ProxyPlan) error {
	_, err := r.col.InsertOne(ctx, plan)
	return err
}

func (r *PlanRepository) ListActive(ctx context.Context) ([]domain.ProxyPlan, error) {
	cur, err := r.col.Find(ctx, bson.M{"active": true}, options.Find().SetSort(bson.D{{Key: "createdAt", Value: -1}}))
	if err != nil {
		return nil, err
	}
	defer cur.Close(ctx)
	var out []domain.ProxyPlan
	if err := cur.All(ctx, &out); err != nil {
		return nil, err
	}
	return out, nil
}

func (r *PlanRepository) FindByID(ctx context.Context, id primitive.ObjectID) (*domain.ProxyPlan, error) {
	var plan domain.ProxyPlan
	err := r.col.FindOne(ctx, bson.M{"_id": id, "active": true}).Decode(&plan)
	if err != nil {
		return nil, mapMongoErr(err)
	}
	return &plan, nil
}
