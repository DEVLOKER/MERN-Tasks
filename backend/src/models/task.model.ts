import { Schema, model } from "mongoose";
import { TTask } from "#shared/types/Task.js";

const TaskSchema = new Schema<TTask>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        complete: { type: Boolean, required: true, default: false },
    },
    { timestamps: true }
);

TaskSchema.set("toJSON", {
    transform: (doc, ret, opt) => {
        let task = { id: ret._id.toString() };
        delete ret._id;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        // return ret
        return { ...task, ...ret };
    },
});

TaskSchema.statics = {};

const TaskModel = model<TTask>("Task", TaskSchema);
export default TaskModel;
