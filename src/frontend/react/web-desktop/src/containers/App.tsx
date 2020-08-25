import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import {importModule, activateModule} from '../store/reducers/modules';

const mapState = ({modules}) => ({modules});
const mapDispatch = {importModule, activateModule};

export const AppContainer = connect(
  mapState,
  mapDispatch,
)(
  ({modules, children, importModule, activateModule}): JSX.Element => {
    const location = useLocation();
    const {imported, active, paths} = modules;

    console.log('modules', modules);

    useEffect(() => {
      const {module} = paths.find(({path}) => path === location.pathname) || [];

      if (module) {
        if (!imported.includes(module)) {
          importModule(module);
        }

        if (active !== module) {
          activateModule(module);
        }
      }

      console.log('Location', location);
    }, [location]);

    return children;
  },
);
