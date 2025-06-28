import 'package:flutter/material.dart';

void main() {
  runApp(const PokemonTcgScannerApp());
}

class PokemonTcgScannerApp extends StatelessWidget {
  const PokemonTcgScannerApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Pokémon TCG Scanner',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _selectedIndex = 0;

  final List<Widget> _pages = const [
    ScanPage(),
    CollectionPage(),
    AuctionPage(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Pokémon TCG Scanner')),
      body: _pages[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.camera_alt), label: 'Scan'),
          BottomNavigationBarItem(icon: Icon(Icons.collections), label: 'Collection'),
          BottomNavigationBarItem(icon: Icon(Icons.store), label: 'Auction'),
        ],
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
      ),
    );
  }
}

class ScanPage extends StatelessWidget {
  const ScanPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.camera_alt, size: 80),
          const SizedBox(height: 20),
          const Text('Scanning not implemented. Using demo data.'),
          ElevatedButton(
            onPressed: () {
              // In a real app, trigger camera scanning here.
            },
            child: const Text('Scan Card'),
          ),
        ],
      ),
    );
  }
}

class CollectionPage extends StatelessWidget {
  const CollectionPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final demoCards = [
      {'name': 'Charizard', 'value': '\$500', 'grade': '9'},
      {'name': 'Pikachu', 'value': '\$300', 'grade': '8'},
      {'name': 'Blastoise', 'value': '\$450', 'grade': '7'},
    ];

    final topCards = demoCards.take(2).toList();
    final recommendedToSell = demoCards.where((c) => c['value'] == '\$500').toList();
    final recommendedToGrade = demoCards.where((c) => c['grade'] == '7').toList();

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Top Cards', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
          ...topCards.map((c) => ListTile(title: Text(c['name']!), subtitle: Text('Value: ${c['value']}'))),
          const SizedBox(height: 20),
          const Text('Recommended to Sell', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
          ...recommendedToSell.map((c) => ListTile(title: Text(c['name']!), subtitle: Text('Value: ${c['value']}'))),
          const SizedBox(height: 20),
          const Text('Recommended to Grade (PSA)', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
          ...recommendedToGrade.map((c) => ListTile(title: Text(c['name']!), subtitle: Text('Current Grade: ${c['grade']}'))),
        ],
      ),
    );
  }
}

class AuctionPage extends StatelessWidget {
  const AuctionPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final auctionItems = [
      {'name': 'Charizard', 'price': '\$700'},
      {'name': 'Pikachu', 'price': '\$350'},
    ];

    return ListView.builder(
      itemCount: auctionItems.length,
      itemBuilder: (context, index) {
        final item = auctionItems[index];
        return ListTile(
          leading: const Icon(Icons.sell),
          title: Text(item['name']!),
          subtitle: Text('Starting price: ${item['price']}'),
          trailing: ElevatedButton(
            onPressed: () {},
            child: const Text('Bid'),
          ),
        );
      },
    );
  }
}
