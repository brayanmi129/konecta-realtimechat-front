export default function Spinner() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/60 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white"></div>
      <p className="text-white mt-4">Cargando...</p>
    </div>
  );
}
