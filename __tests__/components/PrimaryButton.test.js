import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PrimaryButton from '../../components/PrimaryButton';

describe('PrimaryButton', () => {
  test('renders the provided title', () => {
    const { getByText } = render(<PrimaryButton title="Clique aqui" />);

    expect(getByText('Clique aqui')).toBeTruthy();
  });

  test('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <PrimaryButton title="Enviar" onPress={onPressMock} testID="btn" />
    );

    fireEvent.press(getByTestId('btn'));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  test('does not trigger onPress while loading', () => {
    const onPressMock = jest.fn();
    const { getByTestId, queryByText } = render(
      <PrimaryButton title="Carregando" loading onPress={onPressMock} testID="btn" />
    );

    const button = getByTestId('btn');

    expect(queryByText('Carregando')).toBeNull();
    fireEvent.press(button);
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
