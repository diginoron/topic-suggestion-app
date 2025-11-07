import React from 'react';
import TopicForm from './components/TopicForm';

const App: React.FC = () => {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "Tahoma, Arial, sans-serif"
    }}>
      <TopicForm />
    </div>
  );
};

export default App;