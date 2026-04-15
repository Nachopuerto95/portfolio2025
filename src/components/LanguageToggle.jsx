import { useLang } from '../i18n';

export default function LanguageToggle() {
	const { lang, setLang } = useLang();
	return (
		<div className="lang-toggle" role="group" aria-label="Language">
			<button
				type="button"
				className={lang === 'es' ? 'active' : ''}
				onClick={() => setLang('es')}
				aria-pressed={lang === 'es'}
			>
				ES
			</button>
			<button
				type="button"
				className={lang === 'en' ? 'active' : ''}
				onClick={() => setLang('en')}
				aria-pressed={lang === 'en'}
			>
				EN
			</button>
		</div>
	);
}
