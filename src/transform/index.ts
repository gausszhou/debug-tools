import { EnumTools } from '../types';
import { sizeofByte } from './modules/size-of-byte';
import { urlParse } from './modules/url-parse';

type ToolFunction = (input: string) => string;

export const methodMap: Record<EnumTools, ToolFunction> = {
  [EnumTools.TEXT_DIFF]: (input: string) => input, // Placeholder for text diff function
  [EnumTools.TEXT_SIZE]: sizeofByte,
  [EnumTools.URL_PARSE]: urlParse,
};

export async function processContent(input: string, type: EnumTools) {  
  if (!methodMap[type]) {
    throw new Error(`Unsupported type: ${type}`);
  }
  console.log('processContent', type)
  let output = "";
  let flag = "success";
  try {
    output = methodMap[type](input)
  } catch (error) {
    flag = "failure" + error;
    output = 'JSON 解析失败';
  }  
  return [output, flag];
}

