import React, { useState } from 'react';
import { ShoppingCart, Package, BarChart3, Users, Globe, UserCircle, Bell, Download, FileText, TrendingUp, AlertCircle, Search, Plus, Minus, Trash2, Edit, Save, Eye, Mail, Phone, MapPin, User, CreditCard, DollarSign, Star, Heart, Grid, List, X, Send } from 'lucide-react';

// Mock Data
const mockProducts = [
  {
    id: 1,
    name: 'Premium Lace Cotton Fabric',
    brand: 'Excelsior',
    category: 'Cotton',
    price: 2500,
    stock: 45,
    description: 'High-quality cotton fabric with intricate lace patterns',
    colors: ['White', 'Cream', 'Light Blue'],
    patterns: 'Floral Lace',
    material: '100% Cotton',
    width: '45 inches',
    length: '5 yards'
  },
  {
    id: 2,
    name: 'Geometric Pattern Lace',
    brand: 'Getzner',
    category: 'Lace',
    price: 3200,
    stock: 32,
    description: 'Modern geometric patterns in premium lace material',
    colors: ['White', 'Gold', 'Silver'],
    patterns: 'Geometric',
    material: '90% Cotton, 10% Polyester',
    width: '48 inches',
    length: '6 yards'
  },
  {
    id: 3,
    name: 'Striped Wool Suiting',
    brand: 'Bouer',
    category: 'Wool',
    price: 4500,
    stock: 28,
    description: 'Professional suiting material with subtle stripes',
    colors: ['Navy', 'Charcoal', 'Brown'],
    patterns: 'Pinstripe',
    material: '100% Wool',
    width: '60 inches',
    length: '3 yards'
  },
  {
    id: 4,
    name: 'Checkered Pattern Cotton',
    brand: 'Filtex',
    category: 'Cotton',
    price: 1800,
    stock: 65,
    description: 'Classic checkered pattern in premium cotton',
    colors: ['Red/White', 'Blue/White', 'Green/White'],
    patterns: 'Checkered',
    material: '100% Cotton',
    width: '42 inches',
    length: '4 yards'
  },
  {
    id: 5,
    name: 'Textured Premium Denim',
    brand: 'Vice Chairman',
    category: 'Cotton',
    price: 3800,
    stock: 12,
    description: 'Premium denim with unique texture and durability',
    colors: ['Indigo', 'Black', 'Light Blue'],
    patterns: 'Textured',
    material: '98% Cotton, 2% Elastane',
    width: '58 inches',
    length: '2 yards'
  }
];

const mockOrders = [
  {
    id: 1001,
    customer: 'Amina Hassan',
    phone: '+234 801 234 5678',
    email: 'amina.hassan@email.com',
    address: 'Plot 45, Ahmadu Bello Way, Kano',
    total: 12500,
    status: 'Processing',
    paymentMethod: 'Card',
    date: '2024-08-06',
    items: 3,
    details: [
      { name: 'Premium Lace Cotton Fabric', quantity: 2, price: 2500 },
      { name: 'Geometric Pattern Lace', quantity: 1, price: 3200 },
      { name: 'Checkered Pattern Cotton', quantity: 2, price: 1800 }
    ]
  },
  {
    id: 1002,
    customer: 'Fatima Abdullahi',
    phone: '+234 803 567 8901',
    email: 'fatima.a@email.com',
    address: 'House 12, Yakubu Gowon Crescent, Abuja',
    total: 9000,
    status: 'Completed',
    paymentMethod: 'Cash',
    date: '2024-08-05',
    items: 2,
    details: [
      { name: 'Striped Wool Suiting', quantity: 1, price: 4500 },
      { name: 'Striped Wool Suiting', quantity: 1, price: 4500 }
    ]
  },
  {
    id: 1003,
    customer: 'Maryam Ibrahim',
    phone: '+234 805 123 4567',
    email: 'maryam.ibrahim@email.com',
    address: 'Shop 15, Wuse Market, Abuja',
    total: 15200,
    status: 'Shipped',
    paymentMethod: 'Transfer',
    date: '2024-08-04',
    items: 4,
    details: [
      { name: 'Textured Premium Denim', quantity: 2, price: 3800 },
      { name: 'Geometric Pattern Lace', quantity: 2, price: 3200 },
      { name: 'Premium Lace Cotton Fabric', quantity: 1, price: 2500 }
    ]
  }
];

const mockCustomers = [
  {
    id: 1,
    name: 'Amina Hassan',
    email: 'amina.hassan@email.com',
    phone: '+234 801 234 5678',
    address: 'Plot 45, Ahmadu Bello Way, Kano',
    type: 'Retail',
    status: 'VIP',
    totalOrders: 15,
    totalSpent: 87500,
    joinDate: '2023-05-15'
  },
  {
    id: 2,
    name: 'Fatima Abdullahi',
    email: 'fatima.a@email.com',
    phone: '+234 803 567 8901',
    address: 'House 12, Yakubu Gowon Crescent, Abuja',
    type: 'Wholesale',
    status: 'Active',
    totalOrders: 25,
    totalSpent: 125000,
    joinDate: '2023-03-22'
  },
  {
    id: 3,
    name: 'Maryam Ibrahim',
    email: 'maryam.ibrahim@email.com',
    phone: '+234 805 123 4567',
    address: 'Shop 15, Wuse Market, Abuja',
    type: 'Wholesale',
    status: 'VIP',
    totalOrders: 35,
    totalSpent: 210000,
    joinDate: '2022-11-08'
  }
];

// Export functionality
const useExportData = (products, orders, customers) => {
  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = Object.keys(data[0] || {});
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportData = () => {
    const choice = prompt(
      'What would you like to export?\n1. Products\n2. Orders\n3. Customers\n4. All Data\nEnter number (1-4):'
    );

    switch (choice) {
      case '1':
        exportToCSV(products, 'ayb_products.csv');
        alert('Products exported successfully!');
        break;
      case '2':
        exportToCSV(orders, 'ayb_orders.csv');
        alert('Orders exported successfully!');
        break;
      case '3':
        exportToCSV(customers, 'ayb_customers.csv');
        alert('Customers exported successfully!');
        break;
      case '4':
        exportToCSV(products, 'ayb_products.csv');
        exportToCSV(orders, 'ayb_orders.csv');
        exportToCSV(customers, 'ayb_customers.csv');
        alert('All data exported successfully!');
        break;
      default:
        alert('Invalid selection. Please choose 1, 2, 3, or 4.');
    }
  };

  return exportData;
};

// Header Component
const Header = ({ cart, onExportData }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold">AYB</span>
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-semibold text-gray-900">AYB Textiles NG</h1>
              <p className="text-xs text-gray-600">Management System</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onExportData}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                  <div className="p-4">
                    <h3 className="font-semibold mb-3">Notifications</h3>
                    <div className="space-y-2">
                      <div className="p-2 bg-red-50 rounded text-sm">
                        <p className="text-red-800">Low stock: Textured Premium Denim (12 units)</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                      <div className="p-2 bg-yellow-50 rounded text-sm">
                        <p className="text-yellow-800">Low stock: Geometric Pattern Lace (32 units)</p>
                        <p className="text-xs text-gray-500">4 hours ago</p>
                      </div>
                      <div className="p-2 bg-blue-50 rounded text-sm">
                        <p className="text-blue-800">New order #1004 received</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <UserCircle className="w-8 h-8 text-gray-600" />
              <span className="text-sm text-gray-700">Admin User</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Dashboard Component
const Dashboard = ({ products, orders, customers }) => {
  const stats = {
    totalProducts: products.length,
    totalStock: products.reduce((sum, product) => sum + product.stock, 0),
    lowStockItems: products.filter(product => product.stock < 50).length,
    totalOrders: orders.length,
    pendingOrders: orders.filter(order => order.status === 'Processing').length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    totalCustomers: customers.length,
    vipCustomers: customers.filter(c => c.status === 'VIP').length
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">₦{stats.totalRevenue.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalOrders}</p>
              <p className="text-xs text-orange-600 mt-1">{stats.pendingOrders} pending</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalCustomers}</p>
              <p className="text-xs text-green-600 mt-1">{stats.vipCustomers} VIP</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Stock Alert</p>
              <p className="text-2xl font-bold text-red-600">{stats.lowStockItems}</p>
              <p className="text-xs text-gray-500 mt-1">Items need reorder</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Recent Orders and Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium">#{order.id} - {order.customer}</p>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₦{order.total.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4 text-red-600">Low Stock Alert</h3>
          <div className="space-y-3">
            {products.filter(product => product.stock < 50).map(product => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.brand}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-red-600">{product.stock} units</p>
                  <p className="text-xs text-gray-500">Reorder needed</p>
                </div>
              </div>
            ))}
            {products.filter(product => product.stock < 50).length === 0 && (
              <p className="text-gray-500 text-center py-4">All products are well stocked!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">AYB TEXTILES NG</h3>
            <p className="text-gray-300 mb-4">
              Dealers in all kinds of textile materials - wholesale and retail. 
              Quality fabrics for every occasion since 2018.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>+234 703 646 6660</p>
              <p>+234 701 715 1556</p>
              <p>info@aybtextiles.ng</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Locations</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Kano - Kantin Kwari Market</p>
              <p>Kano - Hospital Road</p>
              <p>Abuja - Wuse 2</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Premium Brands</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• Excelsior • Getzner</p>
              <p>• Bouer • Filtex</p>
              <p>• Vice Chairman</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 AYB Textiles NG. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Simple components for other tabs
const SimpleInventory = ({ products }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Inventory Management</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <div key={product.id} className="bg-white p-4 rounded-lg shadow border">
          <div className="h-32 bg-gray-200 rounded mb-3 flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <h4 className="font-medium">{product.name}</h4>
          <p className="text-sm text-gray-600">{product.brand}</p>
          <p className="text-lg font-bold text-blue-600">₦{product.price.toLocaleString()}</p>
          <p className={`text-sm ${product.stock < 50 ? 'text-red-600' : 'text-green-600'}`}>
            {product.stock} in stock
          </p>
        </div>
      ))}
    </div>
  </div>
);

const SimplePOS = ({ products, cart, setCart }) => {
  const addToCart = (product) => {
    if (product.stock <= 0) {
      alert('Out of stock');
      return;
    }
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? {...item, quantity: item.quantity + 1}
          : item
      ));
    } else {
      setCart([...cart, {...product, quantity: 1}]);
    }
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-6">Point of Sale</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow border p-4">
              <div className="h-32 bg-gray-200 rounded mb-3 flex items-center justify-center">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="font-semibold mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
              <p className="text-lg font-bold text-blue-600 mb-3">₦{product.price.toLocaleString()}</p>
              <button
                onClick={() => addToCart(product)}
                className={`w-full py-2 rounded font-medium ${
                  product.stock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow border p-6">
        <h3 className="text-lg font-semibold mb-4">Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h3>
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">₦{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>₦{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}</span>
              </div>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg mt-4 hover:bg-green-700">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SimpleEcommerce = ({ products, cart, setCart }) => {
  const addToCart = (product) => {
    if (product.stock <= 0) {
      alert('Out of stock');
      return;
    }
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? {...item, quantity: item.quantity + 1}
          : item
      ));
    } else {
      setCart([...cart, {...product, quantity: 1}]);
    }
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-2">E-Commerce Store</h2>
        <p className="text-blue-100">Browse our premium textile collection online</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow border overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <Package className="w-16 h-16 text-gray-400" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                ))}
                <span className="text-xs text-gray-500">(4.0)</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xl font-bold text-blue-600">₦{product.price.toLocaleString()}</span>
                <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                </span>
              </div>
              {product.colors && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {product.colors.slice(0, 3).map((color, index) => (
                      <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <button
                onClick={() => addToCart(product)}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  product.stock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="w-4 h-4 inline mr-2" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState(mockProducts);
  const [orders, setOrders] = useState(mockOrders);
  const [customers, setCustomers] = useState(mockCustomers);
  const [cart, setCart] = useState([]);

  const exportData = useExportData(products, orders, customers);

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'inventory', name: 'Inventory', icon: Package },
    { id: 'pos', name: 'Point of Sale', icon: ShoppingCart },
    { id: 'ecommerce', name: 'E-Commerce', icon: Globe },
    { id: 'orders', name: 'Orders', icon: FileText },
    { id: 'customers', name: 'Customers', icon: UserCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cart={cart} onExportData={exportData} />
      
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard 
            products={products} 
            orders={orders} 
            customers={customers}
          />
        )}
        
        {activeTab === 'inventory' && (
          <SimpleInventory products={products} />
        )}
        
        {activeTab === 'pos' && (
          <SimplePOS 
            products={products} 
            cart={cart}
            setCart={setCart}
          />
        )}
        
        {activeTab === 'ecommerce' && (
          <SimpleEcommerce 
            products={products}
            cart={cart}
            setCart={setCart}
          />
        )}
        
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Order Management</h2>
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium">#{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold">₦{order.total.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-xs rounded-full ${
                            order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-blue-600 hover:text-blue-900 text-sm mr-3">
                            View
                          </button>
                          <button className="text-green-600 hover:text-green-900 text-sm">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Customer Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customers.map(customer => (
                <div key={customer.id} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold text-blue-600">
                        {customer.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold">{customer.name}</h3>
                      <p className="text-sm text-gray-600">{customer.type}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>{customer.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <p className="text-sm font-semibold">₦{customer.totalSpent.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{customer.totalOrders} orders</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        customer.status === 'VIP' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {customer.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;