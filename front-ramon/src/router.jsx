    import { createBrowserRouter } from 'react-router-dom';
    import Layout from './layouts/Layout';
    import AuthLayout from './layouts/AuthLayout';
    import Inicio from './views/Inicio';
    import Login from './views/Login';
    import Cadastro from './views/Cadastro';
    import AdminLayout from './layouts/AdminLayout'
    import Ordens from './views/Ordens'
    import Produtos from './views/Produtos'
    import CadastroProduto from './views/CadastroProduto'
    import EditProduto from './views/EditProduto';



    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout/>,
            children: [
                {
                    index: true,
                    element: <Inicio/>
                }
            ]
        },
        {
            path: '/admin',
            element: <AuthLayout/>,
            children: [
                {
                    path: '/admin/login',
                    element: <Login/>
                },
                {
                    path: '/admin/cadastro',
                    element: <Cadastro/>
                }
            ]
        },
        {
            path: '/terminal',
            element: <AdminLayout />,
            children: [
                {
                    index: true,
                    element: <Ordens />
                },
                {
                    path: '/terminal/produtos',
                    element: <Produtos />
                },
                {
                    path: '/terminal/cadastroproduto',
                    element: <CadastroProduto />
                },           
                {
                    path: '/terminal/editproduto/:id',
                    element: <EditProduto />
                }
            ]
        }
        
    ])

    export default router
