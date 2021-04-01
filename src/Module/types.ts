import { ObjectId } from 'bson';

export default interface MongoDoc {
  data: {
    adks: Record<string, any>[];
    [x: string]: any;
  };
  update: (shouldMarkAsComplete?: any) => Promise<any>;
  changeStream: any;
}

export interface TableItem {
  user_id: ObjectId;
  time: Date;
  log: string;
  uniqueId: ObjectId;
}
