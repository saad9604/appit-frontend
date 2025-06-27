import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Box, Typography } from '@mui/material';

const RichTextEditor = ({ value, onChange, error }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <Box mt={3}>
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Description*
      </Typography>

      <Box
        sx={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px',
          minHeight: '200px',
          backgroundColor: '#fff',
        }}
      >
        <EditorContent editor={editor} />
      </Box>

      {error && (
        <Typography variant="caption" color="error">
          Required
        </Typography>
      )}
    </Box>
  );
};
