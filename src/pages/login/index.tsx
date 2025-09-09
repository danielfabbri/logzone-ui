import MainLayout from '../../components/layout/MainLayout';
import LoginForm from '@/components/login/LoginForm';

export default function Login() {

  return (
    <MainLayout>
      <main className="flex-grow flex items-center justify-center py-12 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <LoginForm />
        </div>
      </main>
      
    </MainLayout>
  );
}