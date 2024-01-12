import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    // Add createdAt and updatedAt fields
    timestamps: true,
  },
})

// Export the Track class to be used as TypeScript type
export class Track {
  @prop({ primary: true, unique: true, required: true })
  spotifyId: string;

  @prop()
  name: string;

  // in 300 height only
  @prop({ default: "default.png" })
  photo: string;

  @prop()
  artistSpotifyId: string;

  @prop()
  artistName: string;

  @prop()
  previewUrl: string;
}

// Create the track model from the Track class
const trackModel = getModelForClass(Track);
export default trackModel;
