import { log } from '@/utils/logging';

describe('logging util tests', () => {
	describe('log tests', () => {
		it('handles message only', () => {
			const consoleSpy = vi.spyOn(console, 'log');
			log('test message');
			expect(consoleSpy).toHaveBeenCalledWith('test message');
		});

		it('handles context', () => {
			const consoleSpy = vi.spyOn(console, 'log');
			const context = { key: 'value' };
			log('test message', context);
			expect(consoleSpy).toHaveBeenCalledWith(
				'test message -- {\n  "key": "value"\n}',
			);
		});

		it('handles empty context', () => {
			const consoleSpy = vi.spyOn(console, 'log');
			const context = {};
			log('test message', context);
			expect(consoleSpy).toHaveBeenCalledWith('test message -- {}');
		});

		it('does not log in production', () => {
			Reflect.set(process.env, 'NODE_ENV', 'production');
			const consoleSpy = vi.spyOn(console, 'log');
			log('test message');
			expect(consoleSpy).not.toHaveBeenCalled();
			Reflect.set(process.env, 'NODE_ENV', 'test');
		});

		it('handles numerical values', () => {
			const consoleSpy = vi.spyOn(console, 'log');
			const context = { key: 123 };
			log('test message', context);
			expect(consoleSpy).toHaveBeenCalledWith(
				'test message -- {\n  "key": 123\n}',
			);
		});
	});
});
