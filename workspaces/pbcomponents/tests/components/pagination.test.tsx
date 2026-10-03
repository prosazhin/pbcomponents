import Pagination from '@/components/shared/pagination';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

// подписи видимых кнопок страниц по порядку, многоточие — '...'
const getItems = () =>
  Array.from(document.querySelectorAll('nav button'))
    .slice(1, -1)
    .map((button) => button.textContent);

describe('Pagination', () => {
  it('при малом total показывает все страницы без многоточий', () => {
    render(<Pagination total={5} />);

    expect(getItems()).toEqual(['1', '2', '3', '4', '5']);
  });

  it('при большом total сворачивает страницы в многоточия вокруг текущей', () => {
    const { rerender } = render(<Pagination total={20} page={1} />);
    expect(getItems()).toEqual(['1', '2', '3', '4', '5', '...', '20']);

    rerender(<Pagination total={20} page={10} />);
    expect(getItems()).toEqual(['1', '...', '9', '10', '11', '...', '20']);

    rerender(<Pagination total={20} page={20} />);
    expect(getItems()).toEqual(['1', '...', '16', '17', '18', '19', '20']);
  });

  it('siblings задаёт число соседей вокруг текущей', () => {
    render(<Pagination total={20} page={10} siblings={2} />);

    expect(getItems()).toEqual(['1', '...', '8', '9', '10', '11', '12', '...', '20']);
  });

  it('текущая страница помечена aria-current, крайние стрелки дизейблятся', () => {
    const { rerender } = render(<Pagination total={3} page={1} />);

    expect(screen.getByRole('button', { name: '1' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next page' })).toBeEnabled();

    rerender(<Pagination total={3} page={3} />);
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });

  it('клики по страницам и стрелкам переключают страницу', async () => {
    const onChange = vi.fn();
    render(<Pagination total={5} onChange={onChange} />);

    await userEvent.click(screen.getByRole('button', { name: '3' }));
    expect(onChange).toHaveBeenLastCalledWith(3);

    await userEvent.click(screen.getByRole('button', { name: 'Next page' }));
    expect(onChange).toHaveBeenLastCalledWith(4);

    await userEvent.click(screen.getByRole('button', { name: 'Previous page' }));
    expect(onChange).toHaveBeenLastCalledWith(3);
  });

  it('при total < 1 ничего не рендерит', () => {
    const { container } = render(<Pagination total={0} />);

    expect(container).toBeEmptyDOMElement();
  });
});
