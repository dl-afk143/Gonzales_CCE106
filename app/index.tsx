import { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { fetchRandomQuote, Quote } from '../services/quotes';

export default function QuotesScreen() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadQuote = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const data = await fetchRandomQuote();

      setQuote(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load a quote.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQuote();
  }, [loadQuote]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Decorative circles */}
        <View style={styles.circleOne} />
        <View style={styles.circleTwo} />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>✦ DAILY INSPIRATION</Text>
          </View>

          <Text style={styles.title}>
            Quote of the Day
          </Text>

          <Text style={styles.subtitle}>
            Take a moment. Read something meaningful.
          </Text>
        </View>

        {/* Quote Card */}
        <View style={styles.quoteCard}>

          {loading ? (
            <View style={styles.centerContent}>
              <View style={styles.loaderCircle}>
                <ActivityIndicator
                  size="large"
                  color="#8B5CF6"
                />
              </View>

              <Text style={styles.loadingTitle}>
                Finding inspiration
              </Text>

              <Text style={styles.loadingText}>
                Please wait a moment...
              </Text>
            </View>
          ) : error !== '' ? (
            <View style={styles.centerContent}>
              <View style={styles.errorIcon}>
                <Text style={styles.errorIconText}>!</Text>
              </View>

              <Text style={styles.errorTitle}>
                Something went wrong
              </Text>

              <Text style={styles.errorText}>
                {error}
              </Text>
            </View>
          ) : quote ? (
            <View>
              <Text style={styles.quoteMark}>
                “
              </Text>

              <Text style={styles.quoteText}>
                {quote.quote}
              </Text>

              <View style={styles.divider} />

              <Text style={styles.author}>
                {quote.author}
              </Text>

              <Text style={styles.authorLabel}>
                AUTHOR
              </Text>
            </View>
          ) : (
            <View style={styles.centerContent}>
              <Text style={styles.emptyIcon}>✦</Text>

              <Text style={styles.emptyTitle}>
                No quote available
              </Text>

              <Text style={styles.emptyText}>
                Tap the button below to try again.
              </Text>
            </View>
          )}
        </View>

        {/* New Quote Button */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            loading && styles.buttonDisabled,
            pressed && !loading && styles.buttonPressed,
          ]}
          onPress={loadQuote}
          disabled={loading}
        >
          {loading ? (
            <View style={styles.buttonContent}>
              <ActivityIndicator color="#FFFFFF" size="small" />

              <Text style={styles.buttonText}>
                Loading...
              </Text>
            </View>
          ) : (
            <View style={styles.buttonContent}>
              <Text style={styles.refreshIcon}>
                ↻
              </Text>

              <Text style={styles.buttonText}>
                NEW QUOTE
              </Text>
            </View>
          )}
        </Pressable>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <View style={styles.footerLine} />

          <Text style={styles.footer}>
            Powered by a public quote API
          </Text>

          <View style={styles.footerLine} />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F1020',
  },

  container: {
    flex: 1,
    width: '100%',
    maxWidth: 700,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 30,
    overflow: 'hidden',
  },

  /* Decorative background */
  circleOne: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#1B1740',
    top: -100,
    right: -100,
  },

  circleTwo: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#171A38',
    bottom: -90,
    left: -100,
  },

  /* Header */
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },

  badge: {
    backgroundColor: '#211C46',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#393064',
    marginBottom: 14,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#A78BFA',
    letterSpacing: 1.5,
  },

  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -0.8,
  },

  subtitle: {
    marginTop: 9,
    fontSize: 14,
    color: '#A5A7B8',
    textAlign: 'center',
  },

  /* Quote Card */
  quoteCard: {
    minHeight: 320,
    backgroundColor: '#181A2F',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#2D304B',
    paddingHorizontal: 30,
    paddingVertical: 28,
    justifyContent: 'center',
    marginBottom: 20,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 10,
  },

  quoteMark: {
    fontSize: 80,
    lineHeight: 75,
    fontWeight: '900',
    color: '#8B5CF6',
    marginBottom: 2,
  },

  quoteText: {
    fontSize: 24,
    lineHeight: 37,
    fontWeight: '600',
    color: '#F8F7FF',
    letterSpacing: -0.3,
  },

  divider: {
    height: 1,
    backgroundColor: '#34364F',
    marginTop: 25,
    marginBottom: 15,
  },

  author: {
    fontSize: 16,
    color: '#C4B5FD',
    fontWeight: '700',
  },

  authorLabel: {
    marginTop: 4,
    fontSize: 9,
    color: '#777A94',
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  /* Loading */
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  loaderCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#211C46',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  loadingTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  loadingText: {
    marginTop: 7,
    fontSize: 13,
    color: '#888BA2',
  },

  /* Error */
  errorIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#3A202B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#713443',
  },

  errorIconText: {
    color: '#F87171',
    fontSize: 24,
    fontWeight: '900',
  },

  errorTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  errorText: {
    marginTop: 8,
    fontSize: 13,
    color: '#999CAF',
    textAlign: 'center',
    lineHeight: 19,
  },

  /* Empty */
  emptyIcon: {
    fontSize: 35,
    color: '#8B5CF6',
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  emptyText: {
    marginTop: 7,
    fontSize: 13,
    color: '#888BA2',
    textAlign: 'center',
  },

  /* Button */
  button: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#7C3AED',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 8,
  },

  buttonDisabled: {
    opacity: 0.65,
  },

  buttonPressed: {
    transform: [
      {
        scale: 0.98,
      },
    ],
  },

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  refreshIcon: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },

  /* Footer */
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
    gap: 12,
  },

  footerLine: {
    height: 1,
    width: 35,
    backgroundColor: '#292B42',
  },

  footer: {
    fontSize: 11,
    color: '#666980',
    textAlign: 'center',
  },
});
