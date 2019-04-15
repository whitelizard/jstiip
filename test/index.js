import { runTests as runV2Tests } from './v2';
import { runTests as runV3Tests } from './v3';
import { runTests as runConversionTests } from './conversion';

runV2Tests();
runV3Tests();
runConversionTests();
