var UserSchema = new mongoose.Schema({
  username: {type: String},
});

mongoose.model('User', UserSchema);