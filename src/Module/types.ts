export default interface MongoDoc {
  data: {
    adks: Record<string, any>[];
    [x: string]: any;
  };
  update: (shouldMarkAsComplete?: any) => Promise<any>;
  changeStream: any;
}
