import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Phone, RefreshCw, Home, MessageCircle, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled React Error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border-2 border-green-200 p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">
                श्री कृषी केंद्र | Shree Krushi Kendra
              </h1>
              <p className="text-sm font-semibold text-gray-700">
                पृष्ठ लोड करताना अडचण आली / Something went wrong loading this page
              </p>
              <p className="text-xs text-gray-500">
                कृपया खालील बटण दाबून पुन्हा प्रयत्न करा किंवा थेट आमच्या हेल्पलाइनवर संपर्क करा.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-4 rounded-xl shadow flex items-center justify-center gap-2 transition-colors text-sm"
              >
                <RefreshCw className="h-4 w-4" />
                <span>पुन्हा प्रयत्न करा / Reload Page</span>
              </button>

              <button
                type="button"
                onClick={this.handleReset}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
              >
                <Home className="h-4 w-4" />
                <span>मुख्य पानावर जा / Go to Homepage</span>
              </button>

              <div className="pt-3 border-t border-gray-100 space-y-2">
                <a
                  href="tel:+917219437160"
                  className="w-full bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
                >
                  <Phone className="h-4 w-4 text-amber-600" />
                  <span>थेट फोन चौकशी: +91 7219437160</span>
                </a>

                <a
                  href="https://wa.me/917219437160?text=Hello%20Shree%20Krushi%20Kendra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-600" />
                  <span>WhatsApp वर मदत मिळवा</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
