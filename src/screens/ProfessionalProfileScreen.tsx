import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';

interface ProfessionalProfileScreenProps {
  onNavigateBack?: () => void;
}

const ProfessionalProfileScreen: React.FC<ProfessionalProfileScreenProps> = ({
  onNavigateBack,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'services' | 'agenda' | 'profile'>('dashboard');

  const services = [
    { icon: '🏠', name: 'Casa Inteligente', sub: 'Automação e Segurança', price: 'R$ 85', unit: '/ hora' },
    { icon: '🔧', name: 'Reparos Internos', sub: 'Instalação e reparo', price: 'R$ 120', unit: '/hr' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onNavigateBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
        <TouchableOpacity style={styles.avatarSmall}>
          <Text style={styles.avatarSmallText}>G</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Hero */}
        <View style={styles.profileHero}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Text style={styles.avatarInitial}>G</Text>
            </View>
            <View style={styles.editAvatarDot}>
              <Text style={styles.editAvatarIcon}>✎</Text>
            </View>
          </View>
          <Text style={styles.userName}>Guilherme</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.starIcon}>⭐</Text>
            <Text style={styles.ratingText}>4.9</Text>
            <Text style={styles.ratingCount}>+120 avaliações</Text>
          </View>
        </View>

        {/* Edit Profile Button */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton} activeOpacity={0.8}>
            <Text style={styles.shareIcon}>⬆</Text>
          </TouchableOpacity>
        </View>

        {/* Jobs Completed */}
        <View style={styles.jobsCard}>
          <View style={styles.jobsLeft}>
            <Text style={styles.jobsLabel}>Jobs completos</Text>
            <Text style={styles.jobsValue}>482</Text>
          </View>
          <View style={styles.jobsCheck}>
            <Text style={styles.jobsCheckIcon}>✓</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>⏱</Text>
            <Text style={styles.statLabel}>RESPOSTA</Text>
            <Text style={styles.statValue}>{'< 15 min'}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🤍</Text>
            <Text style={styles.statLabel}>SATISFAÇÃO</Text>
            <Text style={styles.statValue}>99.2%</Text>
          </View>
        </View>

        {/* About */}
        <Text style={styles.sectionTitle}>SOBRE MIM</Text>
        <View style={styles.aboutCard}>
          <Text style={styles.aboutText}>
            Profissional dedicado com mais de 8 anos de experiência em soluções
            residenciais de alto padrão.{'\n\n'}Especializado em integração de
            casas inteligentes, trabalhos elétricos de precisão e projetos de
            sistemas sustentáveis. Comprometido em entregar excelência e
            precisão técnica em cada projeto.
          </Text>
        </View>

        {/* Services */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>SERVIÇOS OFERECIDOS</Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        {services.map((service, i) => (
          <View key={i} style={styles.serviceCard}>
            <View style={styles.serviceIconBox}>
              <Text style={styles.serviceIcon}>{service.icon}</Text>
            </View>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceSub}>{service.sub}</Text>
            </View>
            <View style={styles.servicePriceBox}>
              <Text style={styles.servicePrice}>{service.price}</Text>
              <Text style={styles.serviceUnit}>{service.unit}</Text>
            </View>
          </View>
        ))}

        {/* Portfolio */}
        <Text style={styles.sectionTitle}>PORTFOLIO</Text>
        <View style={styles.portfolioGrid}>
          <View style={[styles.portfolioItem, styles.portfolioLarge]}>
            <View style={styles.portfolioPlaceholder}>
              <Text style={styles.portfolioPlaceholderText}>💡</Text>
            </View>
          </View>
          <View style={styles.portfolioSmallCol}>
            <View style={[styles.portfolioItem, styles.portfolioSmall]}>
              <View style={[styles.portfolioPlaceholder, { backgroundColor: '#1C2A3A' }]}>
                <Text style={styles.portfolioPlaceholderText}>🔧</Text>
              </View>
            </View>
            <View style={[styles.portfolioItem, styles.portfolioSmall]}>
              <View style={[styles.portfolioPlaceholder, { backgroundColor: '#1A2236' }]}>
                <Text style={styles.portfolioPlaceholderText}>+12</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        {[
          { key: 'dashboard', icon: '⊞', label: 'DASHBOARD' },
          { key: 'services', icon: '◎', label: 'SERVIÇOS' },
          { key: 'agenda', icon: '▤', label: 'AGENDA' },
          { key: 'profile', icon: '◉', label: 'PERFIL' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => setActiveTab(tab.key as any)}
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
  container: { flex: 1, backgroundColor: '#0D1117' },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 56 : 20,
    paddingBottom: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#161B22',
    borderWidth: 1,
    borderColor: '#21262D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: { fontSize: 18, color: '#E6EDF3' },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#E6EDF3',
    letterSpacing: 0.3,
  },
  avatarSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2D3748',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#4D9EF5',
  },
  avatarSmallText: { fontSize: 14, fontWeight: '700', color: '#E6EDF3' },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 32 },

  // Profile Hero
  profileHero: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 20,
  },
  avatarWrapper: { position: 'relative', marginBottom: 12 },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#2D3748',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#4D9EF5',
  },
  avatarInitial: { fontSize: 36, fontWeight: '700', color: '#E6EDF3' },
  editAvatarDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#4D9EF5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#0D1117',
  },
  editAvatarIcon: { fontSize: 12, color: '#fff' },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#E6EDF3',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  starIcon: { fontSize: 14 },
  ratingText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#E6EDF3',
  },
  ratingCount: {
    fontSize: 13,
    color: '#6B7280',
  },

  // Actions
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#4D9EF5',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
    shadowColor: '#4D9EF5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  shareButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#161B22',
    borderWidth: 1,
    borderColor: '#30363D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIcon: { fontSize: 18, color: '#E6EDF3' },

  // Jobs Card
  jobsCard: {
    backgroundColor: '#161B22',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#21262D',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  jobsLeft: {},
  jobsLabel: { fontSize: 11, color: '#6B7280', marginBottom: 4 },
  jobsValue: { fontSize: 28, fontWeight: '800', color: '#E6EDF3' },
  jobsCheck: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(77,158,245,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobsCheckIcon: { fontSize: 16, color: '#4D9EF5' },

  // Stats
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#161B22',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#21262D',
    marginBottom: 24,
    overflow: 'hidden',
  },
  statCard: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 16,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#21262D',
    marginVertical: 12,
  },
  statIcon: { fontSize: 16, marginBottom: 8 },
  statLabel: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '600',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#E6EDF3',
  },

  // Section
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8B949E',
    letterSpacing: 1.2,
    marginBottom: 12,
    marginTop: 8,
  },
  sectionLink: {
    fontSize: 13,
    color: '#4D9EF5',
    fontWeight: '600',
    marginBottom: 12,
  },

  // About
  aboutCard: {
    backgroundColor: '#161B22',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#21262D',
    padding: 16,
    marginBottom: 24,
  },
  aboutText: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 22,
  },

  // Services
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161B22',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#21262D',
    padding: 14,
    marginBottom: 10,
    gap: 12,
  },
  serviceIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#0D1117',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#30363D',
  },
  serviceIcon: { fontSize: 18 },
  serviceInfo: { flex: 1 },
  serviceName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E6EDF3',
    marginBottom: 2,
  },
  serviceSub: { fontSize: 12, color: '#6B7280' },
  servicePriceBox: { alignItems: 'flex-end' },
  servicePrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#4D9EF5',
  },
  serviceUnit: { fontSize: 10, color: '#6B7280' },

  // Portfolio
  portfolioGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
    height: 160,
  },
  portfolioItem: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  portfolioLarge: { flex: 1.4 },
  portfolioSmallCol: {
    flex: 1,
    gap: 10,
  },
  portfolioSmall: { flex: 1 },
  portfolioPlaceholder: {
    flex: 1,
    backgroundColor: '#161B22',
    borderWidth: 1,
    borderColor: '#21262D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  portfolioPlaceholderText: {
    fontSize: 24,
    color: '#4D9EF5',
    fontWeight: '700',
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
  tabLabel: {
    fontSize: 8,
    color: '#4B5563',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
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

export default ProfessionalProfileScreen;