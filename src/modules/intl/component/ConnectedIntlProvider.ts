import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import enMessages from '../en.json';
import viMessages from '../vi.json';
import { AppState } from '../../../redux/reducer';
export function getMessages(locale: string): any {
  if (locale.startsWith('en')) {
    return enMessages;
  }
  return viMessages;
}
function mapStateToProps(state: AppState) {
  return {
    locale: state.intl.locale,
    messages: getMessages(state.intl.locale),
  };
}

export default connect(mapStateToProps)(IntlProvider);
