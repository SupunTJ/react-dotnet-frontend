export default interface apiResponse {
  data?: {
    //this will give suggestions so if possible use the format if you know that
    statusCode?: number;
    isSuccess?: boolean;
    errorMessage?: Array<string>;
    result: {
      // this will not give suggestions
      [key: string]: string;
    };
  };
  error?: any;
}
