import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Platform,
  Image,
} from 'react-native';

interface ContractorHomeScreenProps {
  onNavigateToProfile?: () => void;
}

const AVATAR_PLACEHOLDER = 'https://i.pravatar.cc/100?img=12';

const ContractorHomeScreen: React.FC<ContractorHomeScreenProps> = ({
  onNavigateToProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'orders' | 'profile'>('home');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1117" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <View style={styles.logoMark}>
            <Text style={styles.logoMarkText}>✦</Text>
          </View>
          <Text style={styles.topBarBrand}>Upserv</Text>
        </View>
        <TouchableOpacity style={styles.bellButton}>
          <Text style={styles.bellIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>A</Text>
            </View>
            <View style={styles.onlineDot} />
          </View>
          <Text style={styles.userName}>Arthur</Text>
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedIcon}>✓</Text>
            <Text style={styles.verifiedText}>CONTRATANTE VERIFICADO</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🛒</Text>
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>Pedidos{'\n'}Realizados</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>⭐</Text>
            <Text style={styles.statValue}>4.9</Text>
            <Text style={styles.statLabel}>Avaliação{'\n'}Média</Text>
          </View>
        </View>

        {/* Rewards Banner */}
        <View style={styles.rewardsBanner}>
          <View style={styles.rewardsLeft}>
            <Text style={styles.rewardsBadge}>MEMBRO PRO</Text>
            <Text style={styles.rewardsTitle}>Upserv Rewards</Text>
            <Text style={styles.rewardsSub}>Próximo negate em 152 pts</Text>
          </View>
          <View style={styles.rewardsRight}>
            <View style={styles.progressOuter}>
              <View style={[styles.progressInner, { width: '85%' }]} />
            </View>
            <Text style={styles.rewardsPercent}>85%</Text>
          </View>
        </View>

        {/* Active Orders */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pedidos Ativos</Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        {/* Order Card 1 */}
        <View style={styles.orderCard}>
          <View style={styles.orderTop}>
            <Text style={styles.orderTitle}>Manutenção Elétrica</Text>
            <View style={[styles.statusBadge, styles.statusDispatched]}>
              <Text style={styles.statusText}>DESPACHADO</Text>
            </View>
          </View>
          <Text style={styles.orderLocation}>Residencial • São Paulo</Text>
          <View style={styles.orderDivider} />
          <View style={styles.orderProfRow}>
            <View style={styles.profAvatar}>
              <Text style={styles.profAvatarText}>R</Text>
            </View>
            <View>
              <Text style={styles.profLabel}>Profissional</Text>
              <Text style={styles.profName}>Roberto Silva</Text>
            </View>
          </View>
        </View>

        {/* Order Card 2 */}
        <View style={styles.orderCard}>
          <View style={styles.orderTop}>
            <Text style={styles.orderTitle}>Limpeza Pós-Obra</Text>
            <View style={[styles.statusBadge, styles.statusArriving]}>
              <Text style={styles.statusText}>CHEGANDO</Text>
            </View>
          </View>
          <Text style={styles.orderLocation}>Comercial • Moema</Text>
          <View style={styles.orderDivider} />
          <View style={styles.orderProfRow}>
            <View style={[styles.profAvatar, { backgroundColor: '#2D3748' }]}>
              <Text style={styles.profAvatarText}>M</Text>
            </View>
            <View>
              <Text style={styles.profLabel}>Profissional</Text>
              <Text style={styles.profName}>Marcela...</Text>
            </View>
          </View>
        </View>

        {/* Settings Menu */}
        <View style={styles.menuSection}>
          {[
            { icon: '⚙️', label: 'Configurações' },
            { icon: '📍', label: 'Endereços Salvos' },
            { icon: '💳', label: 'Métodos de Pagamento' },
            { icon: '❓', label: 'Ajuda' },
          ].map((item, i) => (
            <TouchableOpacity key={i} style={styles.menuItem} activeOpacity={0.7}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutButton} activeOpacity={0.8}>
          <Text style={styles.signOutIcon}>⊕</Text>
          <Text style={styles.signOutText}>SAIR DA CONTA</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        {[
          { key: 'home', icon: '⊞', label: 'HOME' },
          { key: 'search', icon: '◎', label: 'BUSCAR' },
          { key: 'orders', icon: '▤', label: 'PEDIDOS' },
          { key: 'profile', icon: '◉', label: 'PERFIL' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => {
              setActiveTab(tab.key as any);
              if (tab.key === 'profile' && onNavigateToProfile) {
                onNavigateToProfile();
              }
            }}
          >
            <Text style={[styles.tabIcon, activeTab === tab.key && styles.tabIconActive]}>
              {tab.icon}
            </Text>
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>
              {tab.label}
            </Text>
            {activeTab === tab.key && <View style={styles.tabActiveLine} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 56 : 20,
    paddingBottom: 12,
    backgroundColor: '#0D1117',
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoMark: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#4D9EF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoMarkText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  topBarBrand: {
    fontSize: 18,
    fontWeight: '800',
    color: '#E6EDF3',
    letterSpacing: 0.3,
  },
  bellButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#161B22',
    borderWidth: 1,
    borderColor: '#21262D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellIcon: { fontSize: 16 },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },

  // Profile Card
  profileCard: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#161B22',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#21262D',
    marginBottom: 16,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2D3748',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#4D9EF5',
  },
  avatarInitial: {
    fontSize: 32,
    fontWeight: '700',
    color: '#E6EDF3',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4D9EF5',
    borderWidth: 2,
    borderColor: '#161B22',
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#E6EDF3',
    marginBottom: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(77,158,245,0.12)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    gap: 6,
  },
  verifiedIcon: {
    fontSize: 11,
    color: '#4D9EF5',
    fontWeight: '700',
  },
  verifiedText: {
    fontSize: 10,
    color: '#4D9EF5',
    fontWeight: '700',
    letterSpacing: 1,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#161B22',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#21262D',
    marginBottom: 16,
    overflow: 'hidden',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 18,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#21262D',
    marginVertical: 12,
  },
  statIcon: { fontSize: 18, marginBottom: 6 },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#E6EDF3',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },

  // Rewards
  rewardsBanner: {
    flexDirection: 'row',
    backgroundColor: '#161B22',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#21262D',
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rewardsLeft: { flex: 1 },
  rewardsBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4D9EF5',
    letterSpacing: 1,
    marginBottom: 4,
  },
  rewardsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#E6EDF3',
    marginBottom: 2,
  },
  rewardsSub: { fontSize: 12, color: '#6B7280' },
  rewardsRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  progressOuter: {
    width: 80,
    height: 6,
    backgroundColor: '#21262D',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressInner: {
    height: 6,
    backgroundColor: '#4D9EF5',
    borderRadius: 3,
  },
  rewardsPercent: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4D9EF5',
  },

  // Section
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E6EDF3',
  },
  sectionLink: {
    fontSize: 13,
    color: '#4D9EF5',
    fontWeight: '600',
  },

  // Order Card
  orderCard: {
    backgroundColor: '#161B22',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#21262D',
    padding: 16,
    marginBottom: 12,
  },
  orderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  orderTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#E6EDF3',
    flex: 1,
  },
  statusBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusDispatched: { backgroundColor: 'rgba(77,158,245,0.15)' },
  statusArriving: { backgroundColor: 'rgba(52,211,153,0.15)' },
  statusText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#4D9EF5',
    letterSpacing: 0.8,
  },
  orderLocation: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
  },
  orderDivider: {
    height: 1,
    backgroundColor: '#21262D',
    marginBottom: 12,
  },
  orderProfRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1C3557',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profAvatarText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4D9EF5',
  },
  profLabel: { fontSize: 10, color: '#6B7280' },
  profName: { fontSize: 13, fontWeight: '600', color: '#E6EDF3' },

  // Menu
  menuSection: {
    backgroundColor: '#161B22',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#21262D',
    marginTop: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#21262D',
  },
  menuIcon: { fontSize: 18, marginRight: 12 },
  menuLabel: {
    flex: 1,
    fontSize: 14,
    color: '#E6EDF3',
    fontWeight: '500',
  },
  menuArrow: { fontSize: 20, color: '#4B5563' },

  // Sign Out
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.3)',
    backgroundColor: 'rgba(239,68,68,0.06)',
    gap: 8,
    marginBottom: 8,
  },
  signOutIcon: { fontSize: 16, color: '#EF4444' },
  signOutText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#EF4444',
    letterSpacing: 1,
  },

  // Tab Bar
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#161B22',
    borderTopWidth: 1,
    borderTopColor: '#21262D',
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingTop: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  tabIcon: { fontSize: 18, color: '#4B5563', marginBottom: 3 },
  tabIconActive: { color: '#4D9EF5' },
  tabLabel: { fontSize: 9, color: '#4B5563', fontWeight: '600', letterSpacing: 0.5 },
  tabLabelActive: { color: '#4D9EF5' },
  tabActiveLine: {
    position: 'absolute',
    bottom: -10,
    width: 24,
    height: 2,
    backgroundColor: '#4D9EF5',
    borderRadius: 1,
  },
});

export default ContractorHomeScreen;
