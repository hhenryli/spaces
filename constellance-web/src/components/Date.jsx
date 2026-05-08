
export default function DateDisplay() {
  return (
    <span>
      {new Date().toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      }).toLowerCase()}
    </span>
  );
}