import { Meta, StoryObj } from '@storybook/react';
import {
  FormTemplate,
  FormFactory,
  useForm,
  useSubscription,
} from 'fully-formed';
import { Turnstile } from '@/components/form-components/turnstile';
import { TurnstileTokenField } from '@/components/form-components/turnstile/turnstile-token-field';
import { GlobalStylesProvider } from '@/stories/global-styles-provider';
import { FormEventHandler } from 'react';
import { PageContainer } from '@/components/utils/page-container';
import { DummySiteKeys } from '@/constants/dummy-site-keys';

const meta: Meta<typeof Turnstile> = {
  component: Turnstile,
};

export default meta;

class FormWithTurnstileTemplate extends FormTemplate {
  public readonly fields = [new TurnstileTokenField()] as const;
}

const FormWithTurnstile = FormFactory.createForm(FormWithTurnstileTemplate);

interface FormWithTurnstileProps {
  sitekey: string;
}

function FormWithTurnstileComponent({ sitekey }: FormWithTurnstileProps) {
  const form = useForm(new FormWithTurnstile());

  const onSubmit: FormEventHandler = e => {
    e.preventDefault();
    form.setSubmitted();
  };

  const formState = useSubscription(form);

  return (
    <GlobalStylesProvider>
      <PageContainer>
        <form
          onSubmit={onSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Turnstile field={form.fields.turnstileToken} sitekey={sitekey} />
          <button
            type="submit"
            className="btn_gradient btn_lg"
            style={{ width: '283px' }}
          >
            Submit
          </button>
        </form>
        <pre>
          Form state:
          {JSON.stringify(formState, null, 2)}
        </pre>
      </PageContainer>
    </GlobalStylesProvider>
  );
}

type Story = StoryObj<typeof Turnstile>;

export const AlwaysPasses: Story = {
  render: () => (
    <FormWithTurnstileComponent sitekey={DummySiteKeys.ALWAYS_PASSES} />
  ),
};

export const AlwaysBlocks: Story = {
  render: () => (
    <FormWithTurnstileComponent sitekey={DummySiteKeys.ALWAYS_BLOCKS} />
  ),
};

export const ForcesInteractiveChallenge: Story = {
  render: () => (
    <FormWithTurnstileComponent sitekey={DummySiteKeys.FORCES_CHALLENGE} />
  ),
};
