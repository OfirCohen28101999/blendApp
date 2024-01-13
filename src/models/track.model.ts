import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Track {
  @prop({ primary: true, unique: true, required: true })
  spotifyId: string;

  @prop()
  name: string;

  // in 300 height only
  @prop({ default: "default.png" })
  image: string;

  @prop()
  artistSpotifyId: string;

  @prop()
  artistName: string;

  @prop()
  previewUrl: string;
}

const trackModel = getModelForClass(Track);
export default trackModel;
