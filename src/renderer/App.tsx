import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './global.css';
import { SaveEditorProvider } from './context/context';
import { UploadSavePage } from './pages/upload-save';
import { EditSavePage } from './pages/edit-save';
import { Toaster } from '@/components/ui/toaster';

export default function App() {
  return (
    <>
      <SaveEditorProvider>
        <Router>
          <Routes>
            <Route path="/edit-save" element={<EditSavePage />} />
            <Route path="/" element={<UploadSavePage />} />
          </Routes>
        </Router>
      </SaveEditorProvider>
      <Toaster />
    </>
  );
}
