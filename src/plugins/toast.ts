import { ref, inject, provide, readonly, type Ref, type InjectionKey, } from 'vue';

interface Toast {
  message: string;
  id: number;
}

interface ToastContext {
  addToast: (message: string) => void;
  state: Readonly<Ref<Toast[]>>;
}

const ToastSymbol: InjectionKey<ToastContext> = Symbol();

let toastId = 0;

export function useToast() {
  const toast = inject(ToastSymbol);
  if (!toast) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return toast;
}

export function provideToast() {
  const state = ref<Toast[]>([]);

  function addToast(message: string) {
    const id = toastId++;
    state.value.push({ message, id });
    setTimeout(() => {
      state.value = state.value.filter(toast => toast.id !== id);
    }, 3000);
  }

  const context: ToastContext = {
    addToast,
    state: readonly(state),
  };

  provide(ToastSymbol, context);
}

const ToastPlugin = {
  install(app) {
    app.provide(ToastSymbol, provideToast());
    app.config.globalProperties.$toast = {
      addToast(message: string) {
        const toast = inject(ToastSymbol);
        if (toast) {
          toast.addToast(message);
        }
      },
    };
  },
};

export default ToastPlugin;
