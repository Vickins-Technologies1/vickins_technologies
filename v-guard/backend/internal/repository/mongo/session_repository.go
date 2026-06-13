package mongorepo

import (
	"context"
	"time"

	"github.com/vickins-technologies/v-guard/backend/internal/domain"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type SessionRepository struct {
	col *mongo.Collection
}

func NewSessionRepository(db *mongo.Database) *SessionRepository {
	return &SessionRepository{col: db.Collection("refresh_sessions")}
}

func (r *SessionRepository) Create(ctx context.Context, session *domain.RefreshSession) error {
	_, err := r.col.InsertOne(ctx, session)
	return err
}

func (r *SessionRepository) FindByTokenHash(ctx context.Context, tokenHash string) (*domain.RefreshSession, error) {
	var session domain.RefreshSession
	err := r.col.FindOne(ctx, bson.M{"tokenHash": tokenHash}).Decode(&session)
	if err != nil {
		return nil, mapMongoErr(err)
	}
	return &session, nil
}

func (r *SessionRepository) Revoke(ctx context.Context, id primitive.ObjectID) error {
	_, err := r.col.UpdateByID(ctx, id, bson.M{"$set": bson.M{"revoked": true, "updatedAt": time.Now().UTC()}})
	return err
}

func (r *SessionRepository) RevokeByUserID(ctx context.Context, userID primitive.ObjectID) error {
	_, err := r.col.UpdateMany(ctx, bson.M{"userId": userID}, bson.M{"$set": bson.M{"revoked": true}})
	return err
}
