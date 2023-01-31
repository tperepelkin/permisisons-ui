export interface FileTransformer<S, T> {
    transformToDbModel(line: string): S;
    transformToClientModel(fieldData: S): T;
}