import mongoose  from 'mongoose';
const Schema = mongoose.Schema;

const DenemeSchema = new Schema({
    order_id: Number,
});

const Deneme = mongoose.model('denemes', DenemeSchema);

export default Deneme;