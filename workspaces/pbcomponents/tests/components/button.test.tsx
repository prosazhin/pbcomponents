import Button from '@/components/shared/button';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AnchorHTMLAttributes } from 'react';
import { describe, expect, it, vi } from 'vitest';

describe('Button', () => {
  it('по умолчанию рендерит <button type="button"> и зовёт onClick', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);

    const button = screen.getByRole('button', { name: 'Save' });
    await userEvent.click(button);

    expect(button).toHaveAttribute('type', 'button');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('с href рендерит ссылку', () => {
    render(
      <Button href='/docs' target='_blank'>
        Docs
      </Button>,
    );

    const link = screen.getByRole('link', { name: 'Docs' });

    expect(link).toHaveAttribute('href', '/docs');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).not.toHaveAttribute('type');
  });

  it('с href и linkComponent рендерит переданный компонент', () => {
    const CustomLink = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => <a data-custom {...props} />;
    render(
      <Button href='/docs' linkComponent={CustomLink}>
        Docs
      </Button>,
    );

    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('data-custom');
  });

  it('задизейбленная кнопка не зовёт onClick', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Save' });
    await userEvent.click(button);

    expect(button).toBeDisabled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('у задизейбленной ссылки снят href и глушится клик, даже с linkComponent', async () => {
    const onClick = vi.fn();
    const CustomLink = vi.fn((props: AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} />);
    const { container } = render(
      <Button href='/docs' linkComponent={CustomLink} disabled onClick={onClick}>
        Docs
      </Button>,
    );

    const link = container.querySelector('a')!;
    await userEvent.click(link);

    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(CustomLink).not.toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('в состоянии loading кнопка недоступна и вместо текста показывает лоадер', async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Save
      </Button>,
    );

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(button).toBeDisabled();
    expect(button).not.toHaveTextContent('Save');
    expect(onClick).not.toHaveBeenCalled();
  });

  it('пробрасывает ref и className', () => {
    const ref = vi.fn();
    render(
      <Button ref={ref} className='custom'>
        Save
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Save' });

    expect(ref).toHaveBeenCalledWith(button);
    expect(button).toHaveClass('custom');
  });
});
