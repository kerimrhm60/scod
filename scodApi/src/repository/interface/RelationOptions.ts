interface RelationOptions<T, K extends keyof T> {
  relationName: string;  
  selectFields: K[];     
}