import type { Component } from 'solid-js';
import { splitProps } from 'solid-js';
import { type LangKeys, LANGUAGES } from '@/lib/config';
import { LangIcon } from '@/components/common/icons';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

type Props = {
  lang: LangKeys;
  class?: string;
};

type LanguageOption = {
  value: string;
  label: string;
};
const languageOptions: LanguageOption[] = Object.entries(LANGUAGES).map(([code, name]) => ({
  value: code,
  label: name,
}));

export const LanguageSelect: Component<Props> = (componentProps) => {
  const [local, _rest] = splitProps(componentProps, ['lang', 'class']);

  const handleSelect = (code: string): void => {
    const [, , ...rest] = window.location.pathname.split('/');
    window.location.pathname = `/${code}/${rest.join('/')}`;
  };

  return (
    <div class={cn('block', local.class)}>
      <Select
        value={languageOptions.find((option) => option.value === local.lang)}
        onChange={(code) => handleSelect(code.value)}
        options={languageOptions}
        optionValue="value"
        optionTextValue="label"
        itemComponent={(props) => <SelectItem item={props.item}>{props.item.rawValue.label}</SelectItem>}
      >
        <SelectTrigger aria-label="Lang" class="w-[180px]">
          <SelectValue<LanguageOption>>
            {(state) => (
              <div class="flex items-center gap-4">
                <LangIcon class="h-6 w-6" />
                {state.selectedOption().label}
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent />
      </Select>
    </div>
  );
};
