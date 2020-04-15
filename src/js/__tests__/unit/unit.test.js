import checkCardMatch from '../../checkCardMatch.js';
import cardsArray from '../../cardsArray.js';
import luhnAlgorithm from '../../luhnAlgorithm.js';

test.each([
  ['true for valid card code', '362823914535', true],
  ['false for invalid card code', '02374526893', false],
])(('should be %s'), (_, input, expected) => {
  const received = checkCardMatch(cardsArray[1], input);
  expect(received).toBe(expected);
});

test.each([
  ['true for valid card code', '49203420324', true],
  ['false for invalid card code', '13474526893', false],
])(('should be %s'), (_, input, expected) => {
  const received = checkCardMatch(cardsArray[8], input);
  expect(received).toBe(expected);
});

test.each([
  ['true for valid card code', '2', true],
  ['false for invalid card code', '1', false],
])(('should be %s'), (_, input, expected) => {
  const received = checkCardMatch(cardsArray[6], input);
  expect(received).toBe(expected);
});

test.each([
  ['true after validating', '371449635398431', true],
  ['false after validating', '13474526845693', false],
])(('should be %s'), (_, input, expected) => {
  const received = luhnAlgorithm(input);
  expect(received).toBe(expected);
});
