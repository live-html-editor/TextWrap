/**
 * @author [S. Mahdi Mir-Ismaili](https://mirismaili.github.io).
 * Created on 1398/2/8 (2019/4/28).
 */

export function initiateObject(source: { [k: string]: any }, target: { [k: string]: any }, def: object) {
	for (const [key, defValue] of Object.entries(def)) {
		const targetValue = target === undefined ? undefined : target[key];
		
		if (typeof defValue === 'object' && defValue !== null) {
			source[key] = {};
			initiateObject(source[key], targetValue, defValue);
			continue;
		}
		
		source[key] = targetValue === undefined ? defValue : targetValue;
	}
}
