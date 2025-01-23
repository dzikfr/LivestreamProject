import { create } from "zustand";
import SingleCard from "../components/SingleCard";

const useStore = create((set) => ({
  angka: 0,
  increment: () => set((state) => ({ angka: state.angka + 1 })),
  decrement: () => set((state) => ({ angka: state.angka - 1 })),
  reset: () => set({ angka: 0 }),
  double: () => set((state) => ({ angka: state.angka * 2 })),
}));

const Test = () => {
  const angka = useStore((state) => state.angka);
  const increment = useStore((state) => state.increment);
  return (
    <div>
      {angka}
      <button onClick={increment} className="btn">
        Increment
      </button>
      <SingleCard/>
    </div>
  );
};

export default Test;
