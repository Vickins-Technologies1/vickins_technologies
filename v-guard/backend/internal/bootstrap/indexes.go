package bootstrap

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ensureIndexes(ctx context.Context, db *mongo.Database) error {
	tctx, cancel := context.WithTimeout(ctx, 15*time.Second)
	defer cancel()

	collections := []struct {
		name    string
		indexes []mongo.IndexModel
	}{
		{
			name: "users",
			indexes: []mongo.IndexModel{
				{Keys: bson.D{{Key: "email", Value: 1}}, Options: options.Index().SetUnique(true)},
			},
		},
		{
			name: "refresh_sessions",
			indexes: []mongo.IndexModel{
				{Keys: bson.D{{Key: "tokenHash", Value: 1}}, Options: options.Index().SetUnique(true)},
				{Keys: bson.D{{Key: "userId", Value: 1}, {Key: "expiresAt", Value: -1}}},
			},
		},
		{
			name: "payments",
			indexes: []mongo.IndexModel{
				{Keys: bson.D{{Key: "reference", Value: 1}}, Options: options.Index().SetUnique(true)},
				{Keys: bson.D{{Key: "userId", Value: 1}, {Key: "createdAt", Value: -1}}},
			},
		},
		{
			name: "usage_snapshots",
			indexes: []mongo.IndexModel{
				{Keys: bson.D{{Key: "userId", Value: 1}, {Key: "source", Value: 1}, {Key: "recordedAt", Value: -1}}},
			},
		},
	}

	for _, c := range collections {
		if _, err := db.Collection(c.name).Indexes().CreateMany(tctx, c.indexes); err != nil {
			return err
		}
	}
	return nil
}
