import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { SaveEditorContext } from '../../context/context';

export const SaveStructure = () => {
  const navigate = useNavigate();
  const { saveStructure } = useContext(SaveEditorContext);

  if (!saveStructure) {
    navigate('/');
  }

  return <span>{JSON.stringify(saveStructure)}</span>;
};
