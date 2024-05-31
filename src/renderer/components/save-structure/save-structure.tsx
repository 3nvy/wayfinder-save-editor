import { useContext } from 'react';

import { SaveEditorContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';

export const SaveStructure = () => {
  const navigate = useNavigate();
  const { saveStructure } = useContext(SaveEditorContext);

  if (!saveStructure) {
    navigate('/');
  }

  return <span>{JSON.stringify(saveStructure)}</span>;
};
