import Select from '@/components/shared/select';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

const OPTIONS = [
  { display: 'Apple', value: 'apple' },
  { display: 'Banana', value: 'banana' },
  { display: 'Cherry', value: 'cherry', disabled: true },
];

describe('Select', () => {
  it('открывает список по клику и выбирает пункт', async () => {
    const onChange = vi.fn();
    render(<Select options={OPTIONS} placeholder='Fruit' onChange={onChange} />);

    const field = screen.getByPlaceholderText('Fruit');
    expect(screen.queryByRole('option')).not.toBeInTheDocument();

    await userEvent.click(field);
    expect(screen.getAllByRole('option')).toHaveLength(3);

    await userEvent.click(screen.getByRole('option', { name: 'Banana' }));

    expect(onChange).toHaveBeenCalledWith(OPTIONS[1]);
    expect(field).toHaveValue('Banana');
    await waitFor(() => expect(screen.queryByRole('option')).not.toBeInTheDocument());
  });

  it('повторный выбор того же пункта снимает выбор', async () => {
    const onChange = vi.fn();
    render(<Select options={OPTIONS} placeholder='Fruit' defaultValue={OPTIONS[0]} onChange={onChange} />);

    const field = screen.getByPlaceholderText('Fruit');
    expect(field).toHaveValue('Apple');

    await userEvent.click(field);
    expect(screen.getByRole('option', { name: 'Apple' })).toHaveAttribute('aria-selected', 'true');
    await userEvent.click(screen.getByRole('option', { name: 'Apple' }));

    expect(onChange).toHaveBeenCalledWith(undefined);
    expect(field).toHaveValue('');
  });

  it('multiple собирает массив и показывает выбранное через запятую', async () => {
    const onChange = vi.fn();
    render(<Select options={OPTIONS} placeholder='Fruit' multiple defaultValue={[OPTIONS[0]]} onChange={onChange} />);

    await userEvent.click(screen.getByPlaceholderText('Fruit'));
    await userEvent.click(screen.getByRole('option', { name: 'Banana' }));

    expect(onChange).toHaveBeenCalledWith([OPTIONS[0], OPTIONS[1]]);
    expect(screen.getByPlaceholderText('Fruit')).toHaveValue('Apple, Banana');
  });

  it('контролируемый value не меняется без обновления пропса', async () => {
    const onChange = vi.fn();
    render(<Select options={OPTIONS} placeholder='Fruit' value={OPTIONS[0]} onChange={onChange} />);

    await userEvent.click(screen.getByPlaceholderText('Fruit'));
    await userEvent.click(screen.getByRole('option', { name: 'Banana' }));

    expect(onChange).toHaveBeenCalledWith(OPTIONS[1]);
    expect(screen.getByPlaceholderText('Fruit')).toHaveValue('Apple');
  });

  it('задизейбленный пункт нельзя выбрать', async () => {
    const onChange = vi.fn();
    render(<Select options={OPTIONS} placeholder='Fruit' onChange={onChange} />);

    await userEvent.click(screen.getByPlaceholderText('Fruit'));
    await userEvent.click(screen.getByRole('option', { name: 'Cherry' }));

    expect(onChange).not.toHaveBeenCalled();
  });

  it('search фильтрует пункты без учёта регистра', async () => {
    render(<Select options={OPTIONS} placeholder='Fruit' search searchPlaceholder='Find' />);

    await userEvent.click(screen.getByPlaceholderText('Fruit'));
    await userEvent.type(screen.getByPlaceholderText('Find'), 'BAN');

    expect(screen.getAllByRole('option').map((option) => option.textContent)).toEqual(['Banana']);
  });
});
