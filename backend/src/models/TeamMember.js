import mongoose from 'mongoose';

const teamMemberSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      default: 'Faculty'
    }
  },
  {
    timestamps: true,
  }
);

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);
export default TeamMember;
