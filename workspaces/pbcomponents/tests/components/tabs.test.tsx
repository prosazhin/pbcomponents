import Tab from '@/components/shared/tab';
import Tabs from '@/components/shared/tabs';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

const renderTabs = (props: Partial<Parameters<typeof Tabs>[0]> = {}) =>
  render(
    <Tabs {...props}>
      {[
        <Tab key='1' label='One'>
          Panel one
        </Tab>,
        <Tab key='2' label='Two' disabled>
          Panel two
        </Tab>,
        <Tab key='3' label='Three'>
          Panel three
        </Tab>,
      ]}
    </Tabs>,
  );

describe('Tabs', () => {
  it('показывает панель активного таба и связывает их через aria', () => {
    renderTabs();

    const tab = screen.getByRole('tab', { name: 'One' });
    const panel = screen.getByRole('tabpanel');

    expect(tab).toHaveAttribute('aria-selected', 'true');
    expect(tab).toHaveAttribute('tabindex', '0');
    expect(panel).toHaveTextContent('Panel one');
    expect(panel).toHaveAttribute('aria-labelledby', tab.id);
    expect(tab).toHaveAttribute('aria-controls', panel.id);
  });

  it('клик переключает таб и зовёт onChange', async () => {
    const onChange = vi.fn();
    renderTabs({ onChange });

    await userEvent.click(screen.getByRole('tab', { name: 'Three' }));

    expect(onChange).toHaveBeenCalledWith(2, expect.anything());
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel three');
  });

  it('стрелки и Home/End ходят по табам, пропуская задизейбленные', async () => {
    renderTabs();

    await userEvent.click(screen.getByRole('tab', { name: 'One' }));
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Three' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Three' })).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Three' })).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');
  });

  it('контролируемый index не меняется без обновления пропса', async () => {
    const onChange = vi.fn();
    renderTabs({ index: 0, onChange });

    await userEvent.click(screen.getByRole('tab', { name: 'Three' }));

    expect(onChange).toHaveBeenCalledWith(2, expect.anything());
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel one');
  });

  it('defaultIndex за пределами списка не роняет компонент', () => {
    renderTabs({ defaultIndex: 10 });

    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel three');
  });
});
