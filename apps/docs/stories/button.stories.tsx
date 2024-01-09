import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@ppdbultimate/elysium';
import { Plus } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Button color variant',
      control: {
        type: 'select',
      },
      options: [
        'primary',
        'secondary',
        'danger',
        'outline',
        'ghost',
        'warning',
      ],
    },
    size: {
      description: 'Button size',
      control: {
        type: 'select',
      },
      options: ['sm', 'base', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Disabled Button',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    children: 'Loading Button',
    isLoading: true,
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    children: 'Small Button',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    children: 'Large Button',
    size: 'lg',
  },
};

export const WithLeftIcon: Story = {
  render: (args) => <Button {...args} leftIcon={Plus} />,
  args: {
    variant: 'primary',
    children: 'Button with Left Icon',
  },
};

export const WithRightIcon: Story = {
  render: (args) => <Button {...args} rightIcon={Plus} />,
  args: {
    variant: 'primary',
    children: 'Button with Right Icon',
  },
};
