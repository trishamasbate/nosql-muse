const { Schema, model } = require('mongoose'); 
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: timestamp => new Date(timestamp).toLocaleString(),
        },
        username:{
            type: String,  
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true, // Ensure virtuals are included in JSON output
        },
        id: false,
    }
);

// Create a virtual property `reactionCount` that retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;