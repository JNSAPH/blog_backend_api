function add(a: number, b: number): number {
    return a + b;
  }
  
  test('Testing if Jest is Setup correctly.', () => {
    expect(add(2, 3)).toBe(5);
  });
  