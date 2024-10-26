import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
export const metadata = {
  title: 'ABCD Restaurants',
  description: 'Trouvez et réservez les meilleurs restaurants près de chez vous',
}
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          <FavoritesProvider>
            <Layout>
              {children}
            </Layout>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}