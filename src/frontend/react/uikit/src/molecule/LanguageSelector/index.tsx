import * as React from 'react';
import {FC, ChangeEvent} from 'react';
import {MenuItem, Select} from '../../atom';

type TLang = 'ru_ru' | 'en_us';

interface ILang {
  title: string;
  name: TLang;
}

export interface IProps {
  className?: string;
  availableLanguages: ILang[];
  currentLanguage: TLang;
  onChangeLanguage: (lang: TLang) => void;
}

interface IChangeEvent {
  value: unknown;
}

export const LanguageSelector: FC<IProps> = ({
  onChangeLanguage,
  currentLanguage,
  className = '',
  availableLanguages,
}) => {
  const [lang, setLanguage] = React.useState<TLang>(currentLanguage);
  const [open, setOpen] = React.useState(false);

  const handleChange = ({target}: ChangeEvent<IChangeEvent>): void => {
    const {value} = target;
    setLanguage(value as TLang);
    onChangeLanguage(value as TLang);
  };

  const handleClose = (): ReturnType<typeof setOpen> => setOpen(false);
  const handleOpen = (): ReturnType<typeof setOpen> => setOpen(true);

  return (
    <Select
      className={className}
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      value={lang}
      onChange={handleChange}>
      {availableLanguages.map(({title, name}) => (
        <MenuItem key={name} value={name}>
          {title}
        </MenuItem>
      ))}
    </Select>
  );
};
